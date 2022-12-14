import { ConnectWallet } from "./mintNFT";

const CheckNFTs = async (contract_address) => {
  const address = await ConnectWallet();
  // use this as default since only tribunal address is defined
  const contractAddress =
    contract_address || import.meta.env.VITE_TEST_CONTRACT_ADDRESS; // use this as default since only tribunal address is defined
  // const chain = ropsten // use this later
  try {
    const res = await fetch(
      // TODO: move to another service
      `https://deep-index.moralis.io/api/v2/${address}/nft?chain=tron&format=decimal`,
      {
        method: "GET",
        headers: {
          "X-API-Key": import.meta.env.VITE_MORALIS_WEB3_API_KEY,
        },
      }
    );

    const nfts = (await res.json()).result;

    return nfts;
  } catch (err) {
    console.log({ err });

    return null;
  }
};
export default CheckNFTs;

export const VerifyNFTs = async (contract_address, userAddress) => {
  try {
    const res = await fetch(
      // TODO: move to another service
      `https://deep-index.moralis.io/api/v2/${userAddress}/nft/${contract_address}?chain=tron&format=decimal`,
      {
        method: "GET",
        headers: {
          "X-API-Key": import.meta.env.VITE_MORALIS_WEB3_API_KEY,
        },
      }
    );

    const nfts = (await res.json()).result;

    return !!nfts;
  } catch (err) {
    console.log({ err });

    return null;
  }
};
