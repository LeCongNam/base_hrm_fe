import apiClient from "@/apis/apiClient";
import { Employee } from "@/types/employee.type";
import { User } from "@/types/user.type";

export class EmployeeDashboardApi {
  private PREFIX = "/dashboard/employees";

  async create(data: { employee: Employee; user: Partial<User> }) {
    try {
      const response = await apiClient.post(this.PREFIX, data);

      return response.data;
    } catch (error) {
      throw new Error(`Error fetching users: ${error}`);
    }
  }

  async getList(payload: TPayloadGetList<Employee> = {}) {
    try {
      const response = await apiClient.get(this.PREFIX, {
        params: payload,
      });

      const { data, total } = response.data;

      return { data, total };
    } catch (error) {
      throw new Error(`Error fetching users: ${error}`);
    }
  }

  async getDetail(id: string) {
    try {
      const response = await apiClient.get(`${this.PREFIX}/${id}`);

      const { data } = response.data;

      return { data };
    } catch (error) {
      throw new Error(`Error fetching users: ${error}`);
    }
  }
}
