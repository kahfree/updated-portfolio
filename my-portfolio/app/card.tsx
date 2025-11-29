import { DiGithubBadge } from "react-icons/di";

interface ICardProps {
    title: string,
    description: string,
    link: string,
    tags: string[]
}

export default function Card(props: ICardProps) {
    const { title, description, link, tags } = props
    return (
        <div className="rounded-md overflow-hidden drop-shadow-xl/25 bg-zinc-100 p-3">
            {/* <img className="w-full rounded-md" src={imageSrc} alt="Sunset in the mountains"></img> */}
            <div className="px-6 py-4">
                <div className="font-bold text-2xl mb-2 text-black">{title}</div>
                <p className="text-gray-700 text-base">
                    {description}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                {tags.map(tag => <span className="inline-block bg-pink-900 rounded-full px-3 py-1 text-sm font-semibold text-slate-50 mr-2 mb-2 glow">#{tag}</span>)}
            </div>
            <hr />
            <div className="p-6">
                <a href={link} target="_blank"><DiGithubBadge className="fill-black scale-200" /></a>
            </div>
        </div>
    )
}