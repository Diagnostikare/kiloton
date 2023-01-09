const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default async function UseFetchGetUser( options, employeeId) {
  
  console.log(employeeId , options , "datoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooos")
  let resHeaders = {};
  let status;
  let responseUser;

  if (employeeId && typeof employeeId === "string") {
    responseUser = await fetch(
      `${API_BASE_URL}/registrations/${employeeId}`,
      options
    )
      .then(
        (res) => {
        console.log(res,"TODAAAAAA KAS RESOUES")
        if (res.status == 302 || res.status === 200 || res.status === 202) {
          status = res.status;
          console.log(status, "STATUS")
          return res.json();
        }else{
          throw new Error("Error al obtener la información del usuario",status = res.status);
        }
      })
      .then((data) => {
        // If reponse has contrilled errors, throw error
        console.log(data, "respuesta OK")
        if (data.errors || data.alert || data.status === "error") {
          console.log("CONTROLLED ERROR", data, status);
          return { status: status === 401 ? status : 400, data };
        }

        // If response is ok, return the data
        return { status, data: data };
      })
      .catch((err) => {
        console.log(err)
        console.log("ERROR", status, err);
        return { status, error: "Error" };
      });
  } 

  return { headers: resHeaders, ...responseUser };

}