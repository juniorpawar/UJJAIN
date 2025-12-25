
const HomeVideo = () => {
    return (
        <div className="relative p-2 h-[30vh] w-80 mt-4 bg-orange-400 rounded-lg overflow-hidden">
            {/* Background video */}
            <video
                autoPlay
                loop
                muted
                className="absolute inset-0 h-full w-full object-cover"
                src="/images/1116.mp4"
            ></video>

            {/* Foreground image */}
            <div className="relative flex items-center">
                <img
                    src="/images/heritage.png"
                    alt="heritage"
                    className="h-10 rounded-full object-cover z-10"
                />
            </div>
        </div>

    )
}

export default HomeVideo