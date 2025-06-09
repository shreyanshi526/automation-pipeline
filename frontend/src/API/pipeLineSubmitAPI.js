import axiosInstance from './CoreAPI';

export async function parsePipeline(pipeline, { onSuccess, onError, onFinally } = {}) {
  if (!pipeline || typeof pipeline !== 'object' || !Array.isArray(pipeline.nodes) || !Array.isArray(pipeline.edges)) {
    const validationError = new Error('Invalid pipeline format. Expected an object with "nodes" and "edges" arrays.');
    if (onError) onError(validationError);
    return;
  }

  try {
    const response = await axiosInstance.post('/pipelines/parse', pipeline);
    if (onSuccess) onSuccess(response.data);
  } catch (error) {
    const normalizedError = {
      message: error?.response?.data?.detail || error.message || 'Unknown error',
      status: error?.response?.status || 500,
      raw: error,
    };
    if (onError) onError(normalizedError);
  }
}
