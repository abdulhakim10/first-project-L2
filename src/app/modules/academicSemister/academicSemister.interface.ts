export type TMonths =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export type TAcademicSemisterName = "Autumn" | "Summar" | "Fall";
export type TAcademicSemisterCode = "01" | "02" | "03";

export type TAcademicSemister = {
  name: TAcademicSemisterName;
  code: TAcademicSemisterCode;
  year: string;
  startMonth: TMonths;
  endMonth: TMonths;
};
