use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, near_bindgen};

near_sdk::setup_alloc!();


#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Hello {
}


impl Default for Hello {
    fn default() -> Self {
        Self {
        }
    }
}

#[near_bindgen]
impl Hello {
    pub fn hello(&self, greeting: String) -> String {
        return "Hello ".to_owned() + &greeting;
    }
}


// // unlike the struct's functions above, this function cannot use attributes #[derive(…)] or #[near_bindgen]
// // any attempts will throw helpful warnings upon 'cargo build'
// // while this function cannot be invoked directly on the blockchain, it can be called from an invoked function
// fn after_counter_change() {
//     // show helpful warning that i8 (8-bit signed integer) will overflow above 127 or below -128
//     env::log("Make sure you don't overflow, my friend.".as_bytes());
// }

// /*
//  * the rest of this file sets up unit tests
//  * to run these, the command will be:
//  * cargo test --package rust-counter-tutorial -- --nocapture
//  * Note: 'rust-counter-tutorial' comes from cargo.toml's 'name' key
//  */

// // use the attribute below for unit tests
// #[cfg(test)]
// mod tests {
//     use super::*;
//     use near_sdk::MockedBlockchain;
//     use near_sdk::{testing_env, VMContext};

//     // part of writing unit tests is setting up a mock context
//     // in this example, this is only needed for env::log in the contract
//     // this is also a useful list to peek at when wondering what's available in env::*
//     fn get_context(input: Vec<u8>, is_view: bool) -> VMContext {
//         VMContext {
//             current_account_id: "alice.testnet".to_string(),
//             signer_account_id: "robert.testnet".to_string(),
//             signer_account_pk: vec![0, 1, 2],
//             predecessor_account_id: "jane.testnet".to_string(),
//             input,
//             block_index: 0,
//             block_timestamp: 0,
//             account_balance: 0,
//             account_locked_balance: 0,
//             storage_usage: 0,
//             attached_deposit: 0,
//             prepaid_gas: 10u64.pow(18),
//             random_seed: vec![0, 1, 2],
//             is_view,
//             output_data_receivers: vec![],
//             epoch_height: 19,
//         }
//     }

//     // mark individual unit tests with #[test] for them to be registered and fired
//     #[test]
//     fn increment() {
//         // set up the mock context into the testing environment
//         let context = get_context(vec![], false);
//         testing_env!(context);
//         // instantiate a contract variable with the counter at zero
//         let mut contract = Counter { val: 0 };
//         contract.increment();
//         println!("Value after increment: {}", contract.get_num());
//         // confirm that we received 1 when calling get_num
//         assert_eq!(1, contract.get_num());
//     }

//     #[test]
//     fn decrement() {
//         let context = get_context(vec![], false);
//         testing_env!(context);
//         let mut contract = Counter { val: 0 };
//         contract.decrement();
//         println!("Value after decrement: {}", contract.get_num());
//         // confirm that we received -1 when calling get_num
//         assert_eq!(-1, contract.get_num());
//     }

//     #[test]
//     fn increment_and_reset() {
//         let context = get_context(vec![], false);
//         testing_env!(context);
//         let mut contract = Counter { val: 0 };
//         contract.increment();
//         contract.reset();
//         println!("Value after reset: {}", contract.get_num());
//         // confirm that we received -1 when calling get_num
//         assert_eq!(0, contract.get_num());
//     }
// }