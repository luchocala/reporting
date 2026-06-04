import D8StatCards from "@/components/dashboard8/D8StatCards";
import D8SalesRevenueChart from "@/components/dashboard8/D8SalesRevenueChart";
import D8TotalCustomers from "@/components/dashboard8/D8TotalCustomers";
import D8UserRetention from "@/components/dashboard8/D8UserRetention";
import D8StoreVisits from "@/components/dashboard8/D8StoreVisits";

export default function Dashboard8() {
  return (
    <div className="space-y-4">
      <D8StatCards />
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-4">
        <D8SalesRevenueChart />
        <D8TotalCustomers />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_2fr] gap-4">
        <D8UserRetention />
        <D8StoreVisits />
      </div>
    </div>
  );
}