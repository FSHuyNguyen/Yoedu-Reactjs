import { useCallback, useEffect, useState } from 'react';
import { PAGE_DEFAULT, PAGE_LIMIT } from '../constants/pagination';

interface PaginationResponse {
  total: number;

  page: number;

  limit: number;
}

interface UseTablePageProps {
  fetchApi: (params: any) => Promise<any>;
}

const useTablePage = <T>({ fetchApi }: UseTablePageProps) => {
  const [data, setData] = useState<T[]>([]);

  const [loading, setLoading] = useState(false);

  const [params, setParams] = useState({
    page: PAGE_DEFAULT,
    limit: PAGE_LIMIT,
    keySearch: '',
  });

  const [pagination, setPagination] = useState<PaginationResponse>({
    total: 0,
    page: PAGE_DEFAULT,
    limit: PAGE_LIMIT,
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetchApi(params);

      setData(response.data.items || []);

      setPagination({
        total: response.data.pagination?.total || 0,

        page: response.data.pagination?.page || PAGE_DEFAULT,

        limit: response.data.pagination?.limit || PAGE_LIMIT,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [fetchApi, params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (value: string) => {
    setParams((prev) => ({
      ...prev,

      keySearch: value,

      page: PAGE_DEFAULT,
    }));
  };

  const handleChangePage = (page: number, limit: number) => {
    setParams((prev) => ({
      ...prev,

      page,
      limit,
    }));
  };

  return {
    data,

    loading,

    pagination,

    params,

    setParams,

    handleSearch,

    handleChangePage,

    refetch: fetchData,
  };
};

export default useTablePage;
