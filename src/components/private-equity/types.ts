export interface TeamMemberProps {
  name: string;
  title: string;
  imageSrc: string;
  bio: string;
  id: string;
  education?: string;
  experience?: string[];
  achievements?: string[];
  specializations?: string[];
}