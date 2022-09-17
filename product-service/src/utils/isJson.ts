export const isJson = (data: any) => {
    try {
      const testIfJson = JSON.parse(data);
      if (typeof testIfJson === "object") {
        return true;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  };