export interface Course {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  price: number;
  discount: number;
  isPublished: boolean;
  coverImage: string;
  createdDate: string;
  updatedDate: string;
  totalContent?: number;
  assessment?: {
    total: number;
    done: number;
  };
}

export interface PurchaseItem {
  id: string;
  status?: string;
  course: Course;
}

export interface CourseProgram {
  id: string;
  title: string;
  isPublished: boolean;
  createdDate: string;
  courses: Course[];
}

export interface SingleCourse {
  id: number;
  title: string;
  shortDesc: string;
  fullDesc: string;
  price: number;
  discount: number;
  isPublished: boolean;
  coverImage: string;
  createdDate: string;
  updatedDate: string;
  instructor: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    isActive: boolean;
    isSuspended: boolean;
    role: string;
    picture: string;
    address: string | null;
    facebookUrl: string | null;
    twitterUrl: string | null;
    linkedinUrl: string | null;
    bio: string | null;
    createdDate: string;
  };
  program: {
    id: string;
    title: string;
    isPublished: boolean;
    createdDate: string;
  };
  originalPriceFormat: string;
  discountPriceFormat: string | null;
  discountedPrice: string | null;
  discountFormat: string | null;
}
export type CourseContentMediaType =
  | "video"
  | "image"
  | "document"
  | "assessment";

export interface CourseContentSub {
  title: string;
  duration: number;
  previewUrl: string | null;
  mediaType: CourseContentMediaType;
}

export interface CourseContentSection {
  title: string;
  courseContentSubs: CourseContentSub[];
}

export interface CourseContents {
  data: CourseContentSection[];
  total: number;
  totalDuration: number;
}

export interface CourseProgramSingle {
  contents: CourseContents;
  course: SingleCourse;
}

export interface CourseComment {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  body: string;
  date: string;
}

export interface Assesmnt {
  id: string;
  price: number;
  course: {
    id: string;
    title: string;
    shortDesc: string;
    fullDesc: string;
    price: number;
    discount: number;
    isPublished: boolean;
    coverImage: string;
    createdDate: string;
    updatedDate: string;
    totalContent: number;
    assessment: {
      total: number;
      done: number;
    };
  };
  order: {
    id: string;
    number: string;
    status: string;
    createdDate: string;
  };
}
