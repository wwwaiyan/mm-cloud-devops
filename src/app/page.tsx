import Link from 'next/link';

const jobListings = [
  { id: 1, title: 'Senior Officer - Devops Engineer', company: 'Yoma Bank', link: 'https://bit.ly/senior-devops-yomabank' },
  { id: 2, title: 'Senior DevOps Engineer', company: 'Yoma Fleet', link: 'https://bit.ly/senior-devops-engineer-yomafleet' },
  { id: 3, title: 'ICT Dev Ops Senior Engineer', company: 'Ooredoo Myanmar', link: 'https://bit.ly/ict-devops-engineer-ooredoo' },
  { id: 4, title: 'Devops Engineer', company: 'Startrick Sdn Bhd', link: 'https://bit.ly/devops-engineer-StartrickSdnBhd' },
  { id: 5, title: 'Assistant Engineer (AWS Devops)', company: 'Global Technology Co., Ltd (GlobalNet)', link: 'https://bit.ly/aws-devops-globalnet' },
  { id: 6, title: 'DevOps Engineer', company: 'HQS Co., Ltd | QSLogics', link: 'https://bit.ly/devops-engineer-hqs-qsl' },
  { id: 7, title: 'System Engineer/Cloud Engineer', company: 'Myanmar Software Integrated Solutions', link: 'https://bit.ly/system-cloud-engineer-msis' },
  { id: 8, title: 'Software-Driven DevOps Engineer', company: 'ABC Content Solutions | Mahar', link: 'https://bit.ly/software-driven-devops-mahar-abc' },
];

export default function Jobs() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url(/background.jpg)' }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      <div className="relative z-10 p-8 max-w-4xl w-full bg-black bg-opacity-30 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-white-900 mb-6">DevOps & Cloud Engineer Jobs</h1>
        <ul className="space-y-4">
          {jobListings.map((job) => (
            <li key={job.id} className="ease-in-out duration-300 hover:scale-y-105 p-4 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-shadow">
              <Link
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold hover:underline"
              >
                {job.title} at {job.company}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
