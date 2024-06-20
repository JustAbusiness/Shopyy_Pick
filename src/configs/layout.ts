import SendIcon from '@mui/icons-material/Send'

export const VerticalItems = [
  {
    title: 'Email',
    path: '/'
  },
  {
    title: "City",
    path: '/city',
    children: [
        {
            title: 'New York',
            path: '/'
        }    
    ]
  },
  {
    title: 'Country',
    path: '/country',
    children: [
      {
        title: "Country 1",
        path: '/',
        children:[
          {
            title: "Country 1.2",
            path: "/",
          }
        ]
      }
    ]
  }
]
