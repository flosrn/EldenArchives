import { format } from "date-fns";
import { fr } from "date-fns/locale";

export const formatDateAndTime = (date: Date) => {
  return format(date, "MMMM d, yyyy 'at' h:mm aa");
};

export const formatDate = (date: Date) => {
  return format(date, "MMMM d, yyyy", { locale: fr });
};

export const dateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};
