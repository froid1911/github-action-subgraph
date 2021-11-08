import { BigInt } from "@graphprotocol/graph-ts"
import {
  Contract,
  Approval,
  Claim,
  ClaimAssist,
  DailyDataUpdate,
  ShareRateChange,
  StakeEnd,
  StakeGoodAccounting,
  StakeStart,
  Transfer,
  XfLobbyEnter,
  XfLobbyExit
} from "../generated/Contract/Contract"
import { ExampleEntity } from "../generated/schema"

export function handleApproval(event: Approval): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.owner = event.params.owner
  entity.spender = event.params.spender

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.allocatedSupply(...)
  // - contract.allowance(...)
  // - contract.approve(...)
  // - contract.balanceOf(...)
  // - contract.btcAddressClaim(...)
  // - contract.btcAddressClaims(...)
  // - contract.btcAddressIsClaimable(...)
  // - contract.btcAddressIsValid(...)
  // - contract.claimMessageMatchesSignature(...)
  // - contract.currentDay(...)
  // - contract.dailyData(...)
  // - contract.dailyDataRange(...)
  // - contract.decimals(...)
  // - contract.decreaseAllowance(...)
  // - contract.globalInfo(...)
  // - contract.globals(...)
  // - contract.increaseAllowance(...)
  // - contract.merkleProofIsValid(...)
  // - contract.name(...)
  // - contract.pubKeyToBtcAddress(...)
  // - contract.pubKeyToEthAddress(...)
  // - contract.stakeCount(...)
  // - contract.stakeLists(...)
  // - contract.symbol(...)
  // - contract.totalSupply(...)
  // - contract.transfer(...)
  // - contract.transferFrom(...)
  // - contract.xfLobby(...)
  // - contract.xfLobbyEntry(...)
  // - contract.xfLobbyMembers(...)
  // - contract.xfLobbyPendingDays(...)
  // - contract.xfLobbyRange(...)
}

export function handleClaim(event: Claim): void {}

export function handleClaimAssist(event: ClaimAssist): void {}

export function handleDailyDataUpdate(event: DailyDataUpdate): void {}

export function handleShareRateChange(event: ShareRateChange): void {}

export function handleStakeEnd(event: StakeEnd): void {}

export function handleStakeGoodAccounting(event: StakeGoodAccounting): void {}

export function handleStakeStart(event: StakeStart): void {}

export function handleTransfer(event: Transfer): void {}

export function handleXfLobbyEnter(event: XfLobbyEnter): void {}

export function handleXfLobbyExit(event: XfLobbyExit): void {}
