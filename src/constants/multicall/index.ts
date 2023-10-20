import { ChainId } from '@catcolortoken/sdk-v2'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.PRIVATE]: process.env.REACT_APP_MULTICALL_ADDRESS as string,
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
