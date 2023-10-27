import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { Button, CardBody } from 'uikit'
import CardNav from 'components/CardNav'
import { Input as TextInput } from 'components/TextInput'
import { AutoColumn } from 'components/Column'
import CatChain from '../../constants/abis/CatChain.json'

import { useActiveWeb3React } from 'hooks'
import AppBody from '../AppBody'
import TranslatedText from 'components/TranslatedText'
import PageHeader from 'components/PageHeader'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { ethers } from 'ethers'

export default function Mint() {
  const theme = useContext(ThemeContext)
  const [loading, setLoading] = React.useState(false)
  const { account, chainId, library, connector } = useActiveWeb3React()
  const [nameToken, setNameToken] = React.useState('')
  const [symbolToken, setSymbolToken] = React.useState('')
  const [supplyToken, setSupplyToken] = React.useState('')

  const mint = async () => {
    if (!chainId || !library || !account) {
      alert('missing dependencies')
      return false
    }
    if (!nameToken) {
      alert('missing token name')
      return false
    }
    if (!symbolToken) {
      alert('missing symbol name')
      return false
    }
    if (!supplyToken) {
      alert('missing supply token')
      return false
    }
    if (isNaN(Number(supplyToken))) {
      alert('only number for supply token')
      return false
    }
    setLoading(true)
    const provider = new ethers.providers.Web3Provider(window.ethereum as any)
    const signer = provider.getSigner()

    const factory = new ethers.ContractFactory(CatChain.abi, CatChain.data.bytecode.object, signer)
    const contract = await factory.deploy(supplyToken, nameToken, symbolToken)
    alert(`Your token is deployed at ${contract.address}`)
    setLoading(false)
    return true
  }

  return (
    <>
      <CardNav activeIndex={2} />
      <AppBody>
        <PageHeader title="Create a token" description="Mint a new Token"></PageHeader>
        <AutoColumn>
          <CardBody>
            <AutoColumn style={{ width: '100%' }}>
              <TextInput
                style={{
                  marginBottom: '10px'
                }}
                value={nameToken}
                placeholder="My Token name"
                onUserInput={val => {
                  setNameToken(val)
                }}
              />
              <TextInput
                style={{
                  marginBottom: '10px'
                }}
                value={symbolToken}
                placeholder="Symbol"
                onUserInput={val => {
                  setSymbolToken(val.toUpperCase())
                }}
              />
              <TextInput
                style={{
                  marginBottom: '10px'
                }}
                value={supplyToken}
                placeholder="Supply"
                onUserInput={val => {
                  setSupplyToken(val)
                }}
              />
              {account ? (
                <Button
                  style={{
                    width: '100%'
                  }}
                  onClick={mint}
                  disabled={loading}
                >
                  <TranslatedText translationId={100}>{!loading ? 'Mint' : 'Processing...'}</TranslatedText>
                </Button>
              ) : (
                <ConnectWalletButton fullWidth />
              )}
            </AutoColumn>
          </CardBody>
        </AutoColumn>
      </AppBody>
    </>
  )
}
