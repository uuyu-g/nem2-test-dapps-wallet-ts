import {
  // AccountLinkTransaction,
  AccountMetadataTransaction,
  // AccountMosaicRestrictionTransaction,
  // AccountOperationRestrictionTransaction,
  // AddressAliasTransaction,
  // MosaicAliasTransaction,
  // AliasTransaction,
  TransferTransaction,
  // LockFundsTransaction,
  // MultisigAccountModificationTransaction,
  // MosaicDefinitionTransaction,
  // MosaicSupplyChangeTransaction,
  // NamespaceRegistrationTransaction,
  // SecretLockTransaction,
  // SecretProofTransaction,
  // MosaicMetadataTransaction,
  // NamespaceMetadataTransaction,
  // MosaicGlobalRestrictionTransaction,
  // MosaicAddressRestrictionTransaction,
  // AggregateTransaction,
  // AccountAddressRestrictionTransaction,
  TransactionType,
} from 'nem2-sdk/dist/src/model/model';
const { TRANSFER, ACCOUNT_METADATA_TRANSACTION } = TransactionType;

export const Txs = {
  [TRANSFER]: TransferTransaction,
  [ACCOUNT_METADATA_TRANSACTION]: AccountMetadataTransaction,
};
