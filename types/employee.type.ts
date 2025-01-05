import { User } from "next-auth";
import { Department } from "./department.type";
import { JobTitle } from "./job-title.type";

export interface Employee {
  employeeId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: Date;
  jobTitle: JobTitle;
  department: Department;
  user: User;
}
