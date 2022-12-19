type Service = {
    id: string;
    name: string;
    url: string;
    picUrl: string;
    userScore: number;
    popularity: number;
    reviewed: boolean;
    published: boolean;
    description: string;
    positive: string[] | null;
    neutral: string[] | null;
    negative: string[] | null;
  };
  
  export default Service;
  