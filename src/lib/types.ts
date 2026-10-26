export type Destination = {name:string;slug:string;displayName:string;region:string;location:string;description:string;activities:string[];notes:string;image:string};
export type ItineraryDay = {day:number;title:string;description:string;activities:string[];places?:string[];morning?:string[];afternoon?:string[];evening?:string[];overnight?:string;image?:string};
export type Tour = {title:string;slug:string;description:string;days:number;nights:number;style:string;region:string;route:string[];image:string;itinerary:ItineraryDay[];featured:boolean;startingPrice?:number|null;currency?:string;mapQuery?:string;mapWaypoints?:{day:string;name:string;desc?:string}[];pace?:string;seasonFocus?:string;highlights?:string[]};
export type Experience = {name:string;slug:string;description:string;category:string;image:string};
export type TravelStyle = {name:string;slug:string;description:string;image:string};
export type Article = {title:string;slug:string;excerpt:string;category:string;image:string;content:string};
export type FAQ = {question:string;answer:string;category:string};
export type ApiEnvelope<T> = {success:boolean;data:T|null;message?:string;errors?:{field?:string;message:string}[]};
