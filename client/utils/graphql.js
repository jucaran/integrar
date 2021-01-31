import { gql } from "@apollo/client";

export const UPLOAD_FILE = gql`
  mutation CreateStudentsWithCsv($file: Upload!, $courseId: ID) {
    createStudentsWithCsv(file: $file, courseId: $courseId) {
      status
    }
  }
`;

export const UPLOAD_CLASS_FILE = gql`
  mutation UploadClassFile($file: Upload!, $classId: ID!) {
    uploadClassFile(file: $file, classId: $classId) {
      status
    }
  }
`;
