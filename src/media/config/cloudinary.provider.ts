import { v2 } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'Cloudinary',
  useFactory: () => {
    return v2.config({
      cloud_name: 'dhs35wmrf',
      api_key: '899996361284457',
      api_secret: 'epKn9U0XF74qY6BaVO800TP_SI0',
    });
  },
};
