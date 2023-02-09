import * as Yup from "yup";

export const validationSchema = (step) => {
  switch (step) {
    case 2:
      return Yup.object({
        // Validate image
        // file is a File object
        weight_image: Yup.mixed().required("Requerido"),
        waist_image:
          Yup.mixed()
          .required("Requerido"),
        data: Yup.object({
          weight: Yup.string().required("Requerido"),
          waist_centimeters: Yup.string().required("Requerido"),
        }),
      });
    case 3:
      return Yup.object({
        data: Yup.object({
          sex: Yup.string().required("Requerido"),
        }),
      });
    case 4:
      return Yup.object({
        data: Yup.object({
          questions: Yup.object({
            exercise_answer_id: Yup.string().required("Requerido"),
          }),
        }),
      });
    case 5:
      return Yup.object({
        data: Yup.object({
          questions: Yup.object({
            smoke_answer_id: Yup.string().required("Requerido"),
          }),
        }),
      });
    case 6:
      return Yup.object({
        data: Yup.object({
          questions: Yup.object({
            avrg_sleep_answer_id: Yup.string().required("Requerido"),
          }),
        }),
      });
    case 7:
      return Yup.object({
        data: Yup.object({
          questions: Yup.object({
            water_intake_answer_id: Yup.string().required("Requerido"),
          }),
        }),
      });
    case 8:
      return Yup.object({
        data: Yup.object({
          questions: Yup.object({
            alcohol_intake_answer_id: Yup.string().required("Requerido"),
          }),
        }),
      });
    case 9:
      return Yup.object({
        data: Yup.object({
          questions: Yup.object({
            self_eval_answer_id: Yup.string().required("Requerido"),
          }),
        }),
      });
    case 10:
      return Yup.object({
        data: Yup.object({
          questions: Yup.object({
            health_state_answer_id: Yup.string().required("Requerido"),
          }),
        }),
      });
    case 11:
      return Yup.object({
        data: Yup.object({
          questions: Yup.object({
            nourish_type_answer_id: Yup.string().required("Requerido"),
          }),
        }),
      });
    default:
      return Yup.object({});
  }
};

export const responseValidationSchema = async (data, step, actions) => {
  if (data.status === 500) {
    if (data.data.message === "Weight image no puede ser mayor a 10MB") {
      actions.setFieldError(
        "weight_image",
        "La imagen no puede ser mayor a 10MB"
      );
    }

    if (data.data.message === "Waist image no puede ser mayor a 10MB") {
      actions.setFieldError(
        "waist_image",
        "La imagen no puede ser mayor a 10MB"
      );
    }

    if (
      data.data.message ===
      "Weight image no puede ser mayor a 10MB y Waist image no puede ser mayor a 10MB"
    ) {
      actions.setFieldError(
        "weight_image",
        "La imagen no puede ser mayor a 10MB"
      );
      actions.setFieldError(
        "waist_image",
        "La imagen no puede ser mayor a 10MB"
      );
    }

    if (data.data.message === "Weight image tiene que ser formato PNG or JPG") {
      actions.setFieldError("weight_image", "Formato de imagen no válido");
    }

    if (data.data.message === "Waist image tiene que ser formato PNG or JPG") {
      actions.setFieldError("waist_image", "Formato de imagen no válido");
    }

    if (
      data.data.message ===
      "Weight image tiene que ser formato PNG or JPG y Waist image tiene que ser formato PNG or JPG"
    ) {
      actions.setFieldError("weight_image", "Formato de imagen no válido");
      actions.setFieldError("waist_image", "Formato de imagen no válido");
    }

    if (
      data.data.message ===
      "Weight image no puede ser mayor a 10MB y Waist image tiene que ser formato PNG or JPG"
    ) {
      actions.setFieldError(
        "weight_image",
        "La imagen no puede ser mayor a 10MB"
      );
      actions.setFieldError("waist_image", "Formato de imagen no válido");
    }

    if (
      data.data.message ===
      "Weight image tiene que ser formato PNG or JPG y Waist image no puede ser mayor a 10MB"
    ) {
      actions.setFieldError("weight_image", "Formato de imagen no válido");
      actions.setFieldError(
        "waist_image",
        "La imagen no puede ser mayor a 10MB"
      );
    }
  }
};
