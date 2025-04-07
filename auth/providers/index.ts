import { Provider } from "next-auth/providers";
import GitHub from "next-auth/providers/github";
import Discord from "next-auth/providers/discord";

const providers: Provider[] = [GitHub, Discord];

export default providers;
