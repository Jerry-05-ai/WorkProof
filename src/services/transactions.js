export const executeTransaction = async (steps, onProgress) => {
  const labels = {
    validating: 'Validating request...',
    processing: 'Processing request...',
    updating: 'Updating records...',
    creating: 'Creating notification...',
    notifying: 'Creating notification...',
    finalizing: 'Finalizing...',
  };

  for (const step of steps) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    onProgress(labels[step] || 'Processing...');
  }

  await new Promise((resolve) => setTimeout(resolve, 400));
  return { success: true };
};

export const endEmployment = async (employeeId, onProgress) => {
  return executeTransaction(
    ['validating', 'processing', 'updating', 'creating', 'finalizing'],
    onProgress
  );
};

export const publishProfile = async (employeeId, fields, onProgress) => {
  return executeTransaction(
    ['validating', 'processing', 'updating', 'creating', 'finalizing'],
    onProgress
  );
};