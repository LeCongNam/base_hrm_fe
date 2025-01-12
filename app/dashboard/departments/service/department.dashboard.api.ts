import apiClient from "@/apis/apiClient";
import { Department } from "@/types/department.type";

export class DepartmentDashboardApi {
  private readonly PREFIX = "dashboard/departments";

  async create(data: Department) {
    try {
      const response = await apiClient.post(this.PREFIX, data);

      return { data: response.data.data, total: response.data.total };
    } catch (error) {
      throw new Error(`Error fetching users: ${error}`);
    }
  }

  async getList(payload: TPayloadGetList<Department> = {}) {
    try {
      if (!payload.skip) {
        payload["skip"] = 0;
      }

      if (!payload.take) {
        payload["take"] = 10;
      }
      const response = await apiClient.get(this.PREFIX, {
        params: payload,
      });

      return { data: response.data.data, total: response.data.total };
    } catch (error) {
      console.error(`Error fetching users: ${error}`);
      throw new Error(`Error fetching users: ${error}`);
    }
  }

  async updateActive(id: number, isActive: boolean) {
    try {
      const response = await apiClient.put(`${this.PREFIX}/${id}`, {
        isActive,
      });

      return response.data;
    } catch (error) {
      console.error(`Error fetching users: ${error}`);
      throw new Error(`Error fetching users: ${error}`);
    }
  }
}
