import copy from "rollup-plugin-copy-assets";

export default ({
    command,
    mode
}) => {
    if (command === 'build') {
        return {
            plugins: [
                copy({
                    assets: [
                        // You can include directories

                        // You can also include files

                    ],
                }),
            ],
        }
    } else {
        return {
            // build specific config
        }
    }
};