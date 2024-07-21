const Pricing = () => {
  return (
    <div className="text-center py-16 px-4 mb-16">
      <h2 className="text-3xl font-bold mb-4">Pricing plans for teams of all sizes</h2>
      <p className="mb-8">
        Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi velit ut non voluptas in. Explicabo id ut laborum.
      </p>
      <div className="flex justify-center space-x-6">
        <div className="bg-white border border-blue-200 rounded-lg p-6 w-72 shadow-lg">
          <h3 className="text-xl font-semibold ">Freelancer</h3>
          <p className="text-2xl font-bold my-4 text-blue-700">$24/month</p>
          <ul className="list-none">
            <li className="my-2">5 products</li>
            <li className="my-2">Up to 1,000 subscribers</li>
            <li className="my-2">Basic analytics</li>
            <li className="my-2">48-hour support response time</li>
          </ul>
        </div>
        <div className="bg-white border-2 border-blue-600 rounded-lg p-6 w-72 relative shadow-lg">
          <h3 className="text-xl font-semibold">Startup</h3>
          <p className="text-2xl font-bold my-4 text-blue-700">$32/month</p>
          <ul className="list-none">
            <li className="my-2">25 products</li>
            <li className="my-2">Up to 10,000 subscribers</li>
            <li className="my-2">Advanced analytics</li>
            <li className="my-2">24-hour support response time</li>
            <li className="my-2">Marketing automations</li>
          </ul>
          <span className="absolute top-0 right-0 bg-blue-600 text-white text-sm px-2 py-1 rounded-bl-lg">Most popular</span>
        </div>
        <div className="bg-white border border-blue-200 rounded-lg p-6 w-72 shadow-lg">
          <h3 className="text-xl font-semibold">Enterprise</h3>
          <p className="text-2xl font-bold my-4 text-blue-700">$48/month</p>
          <ul className="list-none">
            <li className="my-2">Unlimited products</li>
            <li className="my-2">Unlimited subscribers</li>
            <li className="my-2">Advanced analytics</li>
            <li className="my-2">1-hour dedicated support response time</li>
            <li className="my-2">Marketing automations</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
