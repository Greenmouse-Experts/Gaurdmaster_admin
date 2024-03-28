
import empty from '../../assets/empty.jpeg'
export const EmptyData = ({size, msg}) => {
    return (
        <div className="py-12">
            <div>
                <div className="flex justify-center">
                    <img src={empty} alt="empty" width={size || 300} height={size || 300}/>
                </div>
                <div className="mt-6">
                    <p className="fw-500 text-gray-500 lg:w-8/12 text-center mx-auto">{msg}</p>
                </div>
            </div>
        </div>
    )
}