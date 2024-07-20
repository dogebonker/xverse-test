import { BaseService } from "./base.service";

const URLs = {
    getWalletInscriptions: (walletAddress: string) => `https://api-3.xverse.app/v1/address/${walletAddress}/ordinal-utxo`,
    getInscriptionDetails: (walletAddress: string, inscriptionId: string) => `https://api-3.xverse.app/v1/address/${walletAddress}/ordinals/inscriptions/${inscriptionId}`,
    getInscriptionContent: (inscriptionId: string) => `https://ord.xverse.app/content/${inscriptionId}`,
}

export class CoreService extends BaseService {
    constructor() {
        super();
    }

    public async getInscriptions({
        walletAddress,
    }: {
        walletAddress: string;
    }) {
        const { data } = await this.http.get(URLs.getWalletInscriptions(walletAddress));
        const inscriptions = data.results.flatMap(inscriptionEntry => 
            inscriptionEntry.inscriptions.map(inscription => inscription.id)
        );

        return inscriptions;
    }

    public async getInscriptionDetails({
        walletAddress,
        inscriptionId,
    }: {
        walletAddress: string;
        inscriptionId: string;
    }) {
        return this.http.get(URLs.getInscriptionDetails(walletAddress, inscriptionId));
    }

    public async getInscriptionContent({
        inscriptionId,
    }: {
        inscriptionId: string;
    }) {
        return this.http.get(URLs.getInscriptionContent(inscriptionId));
    }
}