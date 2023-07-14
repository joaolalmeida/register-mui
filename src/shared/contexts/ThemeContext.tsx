import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { Box, ThemeProvider } from '@mui/material'
import { DarkTheme, LightTheme } from './../themes'

interface IThemeContextData {
  // I = Interface -- Data = Dados // Definindo a interface para os dados do contexto
  themeName: 'light' | 'dark' // Propriedades que vão aceitar apenas 'light' ou 'dark'
  toggleTheme: () => void // Função para alternar os temas
}

interface IAppThemeProviderProps {
  // Definindo a interface para as propriedades do componente
  children: React.ReactNode // Propriedade 'children' que recebe elementos React como filho
}

const ThemeContext = createContext({} as IThemeContextData)

export const useAppThemeContext = () => {
  // Hook personalizado para utilizar o contexto
  return useContext(ThemeContext)
}

export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({
  children,
}) => {
  // Definição do componente
  const [themeName, setThemeName] = useState<'light' | 'dark'>('light') // Estado para armazenar o tema atual

  const toggleTheme = useCallback(() => {
    // Função para alternar o tema
    setThemeName((oldThemeName) =>
      oldThemeName === 'light' ? 'dark' : 'light',
    ) // Altera o tema com base no estado anterior
  }, [])

  const theme = useMemo(() => {
    // Memoização para otimizar o cálculo do tema
    if (themeName === 'light') return LightTheme // Retorna o tema claro caso themeName seja 'light'

    return DarkTheme // Retorna o tema escuro caso contrário
  }, [themeName])

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box
          width="100vw"
          height="100vh"
          bgcolor={theme.palette.background.default}
        >
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
