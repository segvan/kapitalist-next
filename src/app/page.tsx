import JobsHistory from "@/src/components/JobsHistory";
import TradeHistory from "@/src/components/tradeHistory";

export const dynamic = "force-dynamic";

const Index = () => (
  <>
    <TradeHistory/>
    <br/>
    <JobsHistory/>
  </>
);

export default Index;
