import { useDispatch, useSelector } from 'react-redux'
import { Produto as ProdutoType } from '../App'
import Produto from '../components/Produto'
import { useGetProdutosQuery } from '../services/api'
import { RootReducer } from '../store'
import { favoritar } from '../store/reducers/favoritos'
import * as S from './styles'

const ProdutosComponent = () => {
  const { data: produtos, isLoading } = useGetProdutosQuery()
  const favoritos = useSelector(
    (state: RootReducer) => state.favoritar.favoritos
  )
  const dispatch = useDispatch()
  if (isLoading) return <h2>Carregando...</h2>

  const produtoEstaNosFavoritos = (produto: ProdutoType) => {
    return favoritos.some((favorito) => favorito.id === produto.id)
  }

  const handleFavoritar = (produto: ProdutoType) => {
    dispatch(favoritar(produto))
  }

  return (
    <>
      <S.Produtos>
        {produtos?.map((produto) => (
          <Produto
            estaNosFavoritos={produtoEstaNosFavoritos(produto)}
            key={produto.id}
            produto={produto}
            favoritar={handleFavoritar}
          />
        ))}
      </S.Produtos>
    </>
  )
}

export default ProdutosComponent
