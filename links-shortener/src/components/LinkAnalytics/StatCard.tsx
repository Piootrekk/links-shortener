type StatCardProps = {
  icon: React.ReactNode;
  title: string;
  value: number;
};

const StatCard: React.FC<StatCardProps> = ({ icon, title, value }) => (
  <div className="shadow rounded-lg p-6 bg-secondary">
    <div className="flex items-center justify-center">
      <div className="flex-shrink-0 bg-icon-blue rounded-md p-3">{icon}</div>
      <div className="ml-5 w-0 flex-1">
        <dl>
          <dt className="text-sm font-medium text-muted-foreground truncate">
            {title}
          </dt>
          <dd className="text-3xl font-semibold ">{value}</dd>
        </dl>
      </div>
    </div>
  </div>
);

export default StatCard;
export type { StatCardProps };
