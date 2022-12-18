import Service from './Service';

type Category = {
  id: string;
  name: string;
  description?: string;
  services: Service[];
};

export default Category;
