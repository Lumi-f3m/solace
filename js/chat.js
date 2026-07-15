// ===================================================================
// SOLACE OS REALTIME CHAT ENGINE INTERFACE
// ===================================================================

const SUPABASE_URL = 'https://prkhomaitwxjqdvgzaid.supabase.co'; 
const SUPABASE_ANON_KEY = 'sb_publishable_Njt9HoGRTBOR-kc1lWS00w_wjxlorOp'; 

// Initialize the connection
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log("solaceOS Chat: Live and working :3");

async function testDatabaseConnection() {
    const { data, error } = await supabase
        .from('messages')
        .select('*');

    if (error) {
        console.error("❌ Connection failed:", error.message);
    } else {
        console.log("✅ Connected! Current logs in database:", data);
    }
}

testDatabaseConnection();