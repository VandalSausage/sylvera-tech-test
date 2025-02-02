import { useQuery } from "@tanstack/react-query";

import { processRequest } from "../api-service";

interface Project {
  id: string;
  url: string;
  status: "Under development" | "Under validation" | "Registration requested";
  country: string | null;
}

const Project = ({
  url,
  status,
  country,
  i,
}: Omit<Project, "id"> & { i: number }) => {
  return (
    <div className="project">
      <h4>{`Project ${i + 1}`}</h4>
      {country ? (
        <p>{country}</p>
      ) : (
        <p className="no-country">No country specified</p>
      )}
      <p>{status}</p>
      <a href={url}>Project Details</a>
    </div>
  );
};

export const Projects = () => {
  const { isPending, error, data } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => processRequest({ path: "projects" }),
  });
  if (isPending) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>{`error: ${error.message}`}</div>;
  }

  return (
    <>
      <h1>Projects</h1>
      <div className="projects">
        {data.map(({ url, status, country, id }, i) => (
          <Project key={id} url={url} status={status} country={country} i={i} />
        ))}
      </div>
    </>
  );
};
