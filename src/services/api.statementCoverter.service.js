import createApiClient from './config/api.service';

class StatementConverterService {
    constructor(baseURL = '/api/statements') {
        this.apiClient = createApiClient();
    }

    async getAll(params) {
        return await this.apiClient.get('', { params });
    }

    async delete(id) {
        return await this.apiClient.delete(`/${id}`);
    }

    async deleteSelected(data) {
        return await this.apiClient.delete('/deleteSelected', data);
    }

}