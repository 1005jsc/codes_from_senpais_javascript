// 리엑트 항해99 전해강 매니저님이 짜신 코드
//
// 기능
// 파일 이미지 사이즈를 자체적으로 줄이는 코드(캔버스 사용),
// dataURL을 파일안에 담는 코드
// 파일 객체를 비동기로 받아와 dataURL로 반환하는 함수,

// 전해강님은 코드구조는 react use 에서 많이 공부하셨다고 한다

import { useCallback, useRef } from 'react';

export const IMAGE_RESIZE_JPEG = 'image/jpeg';
export const IMAGE_RESIZE_PNG = 'image/png';
export const IMAGE_RESIZE_WEBP = 'image/webp';

export const IMAGE_REQUIRE_WIDTH_DEFAULT = 1200;
export const IMAGE_REQUIRE_WIDTH_SMALL = 512;

export const useImageResize = () => {
  const original_file = useRef(null);

  const getDrawImageFile = useCallback((image, option) => {
    const type = option?.type || IMAGE_RESIZE_JPEG;
    const require_width = option?.require_width || IMAGE_REQUIRE_WIDTH_DEFAULT;
    const quality = option?.quality || 0.9;

    let canvas = document.createElement('canvas');
    let width = image.width;
    let height = image.height;

    if (require_width) {
      if (width > height) {
        if (width > require_width) {
          height *= require_width / width;
          width = require_width;
        }
      } else {
        if (height > require_width) {
          width *= require_width / height;
          height = require_width;
        }
      }
    }

    const dataURItoFile = (dataURI) => {
      const decoded = Buffer.from(dataURI.split(',')[1], 'base64');

      const original_name = original_file.current.name;
      const last_index_of_dot = original_name.lastIndexOf('.');
      const original_type = original_name.slice(last_index_of_dot + 1);

      const file_name = original_name.replace(
        original_type,
        type.split('/')[1]
      );

      return new File([decoded], `${require_width}_${file_name}`, { type });
    };

    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(image, 0, 0, width, height);

    const dataUrl = canvas.toDataURL(type, quality);

    return dataURItoFile(dataUrl);
  }, []);

  const readFileAsync = useCallback((file) => {
    return new Promise((resolve, reject) => {
      if (!file) return false;

      let file_reader = new FileReader();

      file_reader.readAsDataURL(file);

      file_reader.onload = () => {
        resolve(file_reader.result);
      };

      file_reader.onerror = reject;
    });
  }, []);

  const readImageAsync = useCallback((result) => {
    return new Promise((resolve, reject) => {
      let image = new Image();
      image.src = result;

      image.onload = () => {
        resolve(image);
      };

      image.onerror = reject;
    });
  }, []);

  const imageResize = useCallback(
    async (file, option) => {
      original_file.current = file;

      const file_result = await readFileAsync(file);
      const image = await readImageAsync(file_result);

      return getDrawImageFile(image, option);
    },
    [getDrawImageFile, readFileAsync, readImageAsync]
  );

  return { imageResize };
};
