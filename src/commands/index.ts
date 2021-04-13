//!register summonerName
export * from './account/add_account';
//!block summonerName
export * from './blocklist/add_blocklist';

//!check user userName
export * from './check_user';

//!check accounts
export * from './account/get_all_accounts';

//!get weekreport
export * from './get_newest_weekreport';

//!remove account summonerName
export * from './account/remove_account';
//!remove block summonerName
export * from './blocklist/remove_blocklist';

//!scout [summonerName]
export * from './scout_accounts';

//!help
export * from './help_text';

//!check blocklist
export * from './blocklist/check_blocklist';

//!q [summonerNames]
export * from './check_lobby';

//!team create teamName
export * from './team/create_team';

//!team teamName add @user
export * from './team/add_user_to_team';

//!team teamName remove @user
export * from './team/remove_user_from_team';

//!team delete teamName
export * from './team/delete_team';