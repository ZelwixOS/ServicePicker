type Service = {
    id: string;
    name: string;
    url: string;
    picUrl: string;
    description: string;
    positive: string[] | null;
    neutral: string[] | null;
    negative: string[] | null;
  };
  
  export default Service;
  