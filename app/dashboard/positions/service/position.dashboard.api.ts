import apiClient from "@/apis/apiClient";
import { Position } from "@/types/position.type";

export class PositionDashboardApi {
  private readonly PREFIX = "/dashboard/positions";

  async create(data: Position) {
    try {
      const response = await apiClient.post(this.PREFIX, data);

      return response.data;
    } catch (error) {
      throw new Error(`Error fetching users: ${error}`);
    }
  }

  async getList(payload: TPayloadGetList<Position> = {}) {
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

  async delete(id: number | undefined) {
    try {
      if (!id) return;

      const response = await apiClient.delete(`${this.PREFIX}/${id}`);

      return response.data;
    } catch (error) {
      throw new Error(`Error fetching users: ${error}`);
    }
  }
}
