function Footer({ client, location, address, telephone }) {
  return (
    <div className="bg-general-blue text-center text-gray-500">
      <h1>{client}</h1>
      <h1>{location}</h1>
      <h1>{address}</h1>
      <h1>{telephone}</h1>
    </div>
  );
}

export default Footer;
