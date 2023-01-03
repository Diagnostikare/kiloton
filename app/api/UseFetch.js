const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default async function UseFetch(slug, options) {
  const headers = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };
  let resHeaders = {};
  let status;

  const response = await fetch(API_BASE_URL + slug, headers)
    .then((res) => {
      if (!res.ok) {
        // throw Error("No fue posible obtener la información.");
      }

      // Save headers
      resHeaders = {
        "access-token": res.headers.get("access-token"),
        client: res.headers.get("client"),
        uid: res.headers.get("uid"),
      };
      status = res.status;
      return res.json();
    })
    .then(
      // If response is ok, return the data
      (data) => {
        // If reponse has contrilled errors, throw error
        if (data.errors || data.alert || data.status === "error") {
          console.log("CONTROLLED ERROR", data, status);
          return { status: status === 401 ? status : 400, data };
        }

        // If response is ok, return the data
        return { status, data: data.data };
      },
      // If response is not ok, return the error
      (rejectionReason) => {
        console.log({
          status,
          error: true,
          errorMessage: "Is no a JSON",
          data: rejectionReason,
        });
        return {
          status,
          error: true,
          errorMessage: "Is no a JSON",
          data: rejectionReason,
        };
      }
    )
    .catch((err) => {
      console.log("ERROR", status, err);
      return { status, error: "Error" };
    });

  return { ...response, headers: resHeaders };
}
