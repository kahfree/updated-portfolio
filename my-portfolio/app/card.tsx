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
        <div className="flex flex-col h-full rounded-3xl overflow-hidden drop-shadow-lg/20 p-3 lg:text-center bg-[#eee8d8]">
            <div className="flex-grow">
                <div className="px-6 py-4">
                    <div className="font-bold text-2xl mb-2 text-black">{title}</div>
                    <p className="text-stone-900 text-base">
                        {description}
                    </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                    {tags.map(tag => <span className="inline-block bg-amber-400 rounded-full px-3 py-1 text-sm font-semibold text-stone-800 mr-2 mb-2 glow">#{tag}</span>)}
                </div>
            </div>
            <hr />
            <div className="p-4 flex justify-start lg:justify-center">
                <a href={link} target="_blank"><DiGithubBadge className="fill-stone-800 scale-200" /></a>
            </div>
        </div>
    )
}