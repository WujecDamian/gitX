declare global {
  module "*.css" {
    const classes: { [key: string]: string };
    export default classes;
  }
  module "*.module.css" {
    const classes: { [key: string]: string };
    export default classes;
  }
  type User = {
    banner_picture_url?: string;
    bio?: string;
    createdAt: Date;
    display_name: string;
    email?: string;
    github_id: string;
    github_profile_url: string;
    id: string;
    profile_picture_url: string;
    socials?: string[];
    tags?: string[];
    username: string;
  };
}

export {};
