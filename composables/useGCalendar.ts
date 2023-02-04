interface GEvent {
  title: string;
  location: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
}
function gDateFormatter(date: string){
  return date.replaceAll('-', '').replaceAll(':', '');
}
export function useGCalendar(event: GEvent) {
  const url = computed(() => {
    /* https://calendar.google.com/calendar/u/0/r/eventedit?dates=20230324T160000/20230325T010000&ctz=America/Buenos_Aires&text=La+Fiesta&location=Estaci%C3%B3n+Fatima&details=Una+Gran+fiesta+de+casamiento+con+Alda+y+Fran&uid=c527e48a-9c90-468a-bb81-9f36d320e191 */
    const title = encodeURIComponent(event.title)
    const location = encodeURIComponent(event.location)
    const description = encodeURIComponent(event.description)
    const startDateTime = encodeURIComponent(gDateFormatter(event.startDateTime))
    const endDateTime = encodeURIComponent(gDateFormatter(event.endDateTime))
  
  
      return `https://calendar.google.com/calendar/u/0/r/eventedit?dates=${startDateTime}/${endDateTime}&ctz=America/Buenos_Aires&text=${title}&location=${location}&details=${description}&uid=c527e48a-9c90-468a-bb81-9f36d320e191`
  })

  return {
    url,
  }
}
