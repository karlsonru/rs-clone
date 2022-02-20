### /resorts

**GET** - вернёт все курорты

**POST** с фильтрами - вернёт курорты в соответствии с фильтрами

>{
>   country: [country1, country2 ... ],
>   slopes: { 
>       total: num, // минимальное значение
>       black: boolean,
>       red: boolean,
>       green: boolean,
>    },
>    cabel: {
>       total: num, // минимальное значение
>       gondola: boolean,
>       bugel: boolean,
>       chairlift: boolean,
>    },
>    rate: num, // минимальное значение
>}

В response будет массив из объектов с курортами 

### /user

**POST**

**PUT**