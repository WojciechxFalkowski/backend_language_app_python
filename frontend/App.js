import { createMockServer } from './src/mocks'
import { Navigation } from './src/navigation'
import { AuthProvider } from './src/context/AuthContext'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
const queryClient = new QueryClient();
// createMockServer()

export default function App () {
  // TODO DONE
  // Logout w nawigacji IMPORTANT
  // zliczanie punktow za dobre i zle odpowiedzi
  // wypchnac na proda IMPORTANT
  // edycja zestawu
  // Zmiana miejscu przycisku 'Graj' na stronie 'set'
  // Loadery
  // Użycie wszędzie gdzie sie da komponentu buttona
  // strona logowania pokazanie bledu z API

  // TODO IMPORTANT
  // Update set na stronie SetScreen nie działa poprawnie BUG IMPORTANT

  // TODO
  // mini statystyki
  // inne poziomy -> 4 opcje, napisanie odpowiedzi w pole input (na start prosta opcja)
  // USTAWIENIA -> możliwość ustawienia czy odpowiadamy po polsku czy angielsku czy losowo, mozliwosc ustawienia
  // jakie poziomy chcemy wybrac

  // Strona zestawu nie można edytować ostatniego elemenetu jeżeli jest dużo elementów
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </QueryClientProvider>
  )
}
